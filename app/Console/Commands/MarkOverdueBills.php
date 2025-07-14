<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\RentalBill;
use App\Notifications\PaymentOverdue;

class MarkOverdueBills extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bills:mark-overdue';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mark rental bills as overdue if past due date and not fully paid';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // $today = Carbon::today();

        // $updatedCount = DB::table('rental_bills')
        //     ->where('due_date', '<', $today)
        //     ->whereRaw('amount_paid < rent_amount')
        //     ->where('payment_status', '!=', 'overdue')
        //     ->update(['payment_status' => 'overdue']);

        // $this->info('Overdue rental bills updated successfully.');

        $today = Carbon::today();

        $overdueBills = RentalBill::with(['lease.tenant'])
            ->where('due_date', '<', $today)
            ->whereRaw('amount_paid < rent_amount')
            ->where('payment_status', '!=', 'overdue')
            ->get();
        
            $updatedCount = 0;

            foreach($overdueBills as $bill) {
                $bill->update(['payment_status' => 'overdue']);

                if($bill->lease && $bill->lease->tenant) {
                    $bill->lease->tenant->notify(new PaymentOverdue($bill));
                }

                $updatedCount++;
            }

            $this->info("Marked {$updatedCount} bills as overdue and sent notifications");
            return Command::SUCCESS;
    }
}
