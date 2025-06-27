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
        Schema::create('maintenance_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('unit_id')->constrained('rental_units')->onDelete('cascade');
            $table->foreignId('lease_id')->nullable()->constrained('leases')->onDelete('set null');
            $table->date('request_date');
            $table->text('maintenance_description');
            $table->enum('request_status', ['pending', 'in_progress', 'completed', 'cancelled'])->default('pending');
            $table->enum('priority_level', ['low', 'medium', 'high', 'urgent']);
            $table->date('scheduled_date')->nullable();
            $table->date('completion_date')->nullable();
            $table->text('tenant_remarks')->nullable();
            $table->text('landlord_notes')->nullable();
            $table->decimal('estimated_cost', 10, 2)->nullable();
            $table->decimal('actual_cost', 10, 2)->nullable();
            $table->timestamps();

            // Indexes
            $table->index(['tenant_id', 'request_status']);
            $table->index(['unit_id', 'request_status']);
            $table->index(['request_status', 'priority_level']);
            $table->index(['request_date', 'priority_level']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance_requests');
    }
};
