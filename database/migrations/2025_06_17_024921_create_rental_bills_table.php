<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rental_bills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lease_id')->constrained('leases')->onDelete('cascade');
            $table->date('billing_date')->nullable();
            $table->decimal('rent_amount', 10, 2);
            $table->string('proof_of_payment_path')->nullable();
            $table->string('reference_number')->nullable();
            $table->date('due_date');
            $table->date('paid_date')->nullable();
            $table->decimal('amount_paid', 10, 2)->default(0);
            $table->enum('payment_status', [ 'paid', 'overdue', 'partial', 'pending', 'pending_verification'])
                ->default('pending');
            $table->timestamps();


            // Indexes
            $table->index(['lease_id', 'payment_status']);
            $table->index(['due_date', 'payment_status']);
            $table->index('billing_date');
            $table->index('payment_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rental_bills');
    }
};
