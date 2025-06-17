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
        Schema::create('rental_units', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // landlord
            $table->string('address');
            $table->string('unit_number')->nullable();
            $table->enum('availability_status', ['available', 'occupied', 'maintenance', 'unavailable'])->default('available');
            $table->decimal('floor_area', 8, 2)->nullable();
            $table->decimal('rent_price', 10, 2);
            $table->enum('property_type', ['apartment', 'house', 'condo', 'studio', 'room']);
//            $table->text('description')->nullable();
//            $table->json('amenities')->nullable();
            $table->timestamps();

            // Indexes
            $table->index(['availability_status', 'property_type']);
            $table->index('rent_price');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rental_units');
    }
};
