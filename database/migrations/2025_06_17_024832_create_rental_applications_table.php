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
        Schema::create('rental_applications', function (Blueprint $table) {
            $table->id();


            $table->foreignId('prospective_tenant_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('unit_id')->constrained('rental_units')->onDelete('cascade');
            $table->date('application_date');
            $table->date('preferred_move_in_date')->nullable();
            $table->enum('application_status', ['pending', 'approved', 'rejected', 'withdrawn'])->default('pending');
            $table->text('additional_notes')->nullable();

            //landlord
            $table->date('reviewed_date')->nullable();
            $table->text('review_notes')->nullable();
            $table->timestamps();



            // Indexes
            $table->index(
                ['prospective_tenant_id', 'application_status'],
                'prospect_status_idx'
            );
            $table->index(
                ['unit_id', 'application_status'],
                'unit_status_idx'
            );
            $table->index('application_date');

            // Prevent duplicate applications
            $table->unique(
                ['prospective_tenant_id', 'unit_id'],
                'prospect_unit_uq'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rental_applications');
    }
};
