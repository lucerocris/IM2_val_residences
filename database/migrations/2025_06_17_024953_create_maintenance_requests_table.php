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
            $table->date('request_date');
            $table->text('maintenance_description');
            $table->enum('request_status', ['pending', 'in_progress', 'completed', 'cancelled'])->default('pending');
            $table->enum('priority_level', ['low', 'medium', 'high', 'urgent']);
            $table->date('completion_date')->nullable();
            $table->text('tenant_remarks')->nullable();
            $table->timestamps();
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
