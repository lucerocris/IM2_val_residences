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
            $table->decimal('remaining_balance', 10, 2);
            $table->decimal('deposit_amount', 10, 2);
            $table->integer('lease_term');
            $table->enum('lease_status', ['active', 'expired', 'terminated', 'pending'])->default('pending');
            $table->date('terminated_date')->nullable();
            $table->string('termination_reason')->nullable();
            $table->timestamps();

            //onboarding stuff
            $table->boolean('onboarding_fees_paid')->default(false);
            $table->boolean('onboarding_signed_lease_uploaded')->default(false);
            $table->boolean('onboarding_id_uploaded')->default(false);

            $table->timestamp('onboarding_fees_paid_at')->nullable();
            $table->timestamp('onboarding_signed_lease_uploaded_at')->nullable();
            $table->timestamp('onboarding_id_uploaded_at')->nullable();
            $table->timestamp('onboarding_completed_at')->nullable();

            $table->decimal('onboarding_fees_amount', 10, 2)->nullable();
            $table->string('onboarding_signed_lease_path')->nullable();
            $table->string('onboarding_proof_of_payment_path')->nullable();
            $table->string('onboarding_id_document_path')->nullable();

            $table->decimal('required_fees_amount', 10, 2)->nullable();

            // Indexes
            $table->index(['tenant_id', 'lease_status']);
            $table->index(['tenant_id', 'lease_status'], 'tenant_lease_status_idx');
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
