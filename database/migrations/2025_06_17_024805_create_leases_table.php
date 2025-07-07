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
        Schema::create('leases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('unit_id')->constrained('rental_units')->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date');
            $table->decimal('monthly_rent', 10, 2);
            $table->decimal('deposit_amount', 10, 2);
            $table->integer('lease_term');
            $table->enum('lease_status', ['active', 'expired', 'terminated', 'pending'])->default('pending');
            $table->text('terms_and_conditions')->nullable();
            $table->date('terminated_date')->nullable();
            $table->string('termination_reason')->nullable();
            $table->timestamps();
            $table->decimal('advance_deposit', 10, 2);

            // Indexes
            $table->index(['tenant_id', 'lease_status']);
            $table->index(['unit_id', 'lease_status']);
            $table->index(['start_date', 'end_date']);
            $table->index(['lease_status', 'end_date']);

            // Prevent overlapping active leases for same unit
            $table->unique(['unit_id', 'start_date', 'end_date'], 'unit_lease_period_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leases');
    }
};
