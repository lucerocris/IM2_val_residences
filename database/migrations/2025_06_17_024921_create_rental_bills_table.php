<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rental_bills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lease_id')->constrained('leases')->onDelete('cascade');
            $table->date('billing_date');
            $table->decimal('amount_due', 10, 2);
            $table->enum('payment_status', ['pending', 'paid', 'overdue', 'partial'])->default('pending');
            $table->date('due_date');
            $table->date('paid_date')->nullable();
//            $table->decimal('amount_paid', 10, 2)->default(0);
//            $table->string('payment_method')->nullable();
//            $table->string('payment_reference')->nullable();
//            $table->text('bill_details')->nullable();
//            $table->decimal('late_fee', 10, 2)->default(0);
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
