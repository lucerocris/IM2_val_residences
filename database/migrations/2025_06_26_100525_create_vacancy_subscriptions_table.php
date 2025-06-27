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
        Schema::create('vacancy_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->string('email');
            $table->string('subscription_name')->nullable();

            $table->json('property_types')->nullable();
            $table->decimal('max_rent', 10, 2)->nullable();


            $table->boolean('is_active')->default(true);
            $table->timestamp('last_notified_at')->nullable();

            $table->timestamps();

            // Indexes
            $table->index(['email', 'is_active']);
            $table->index(['user_id', 'is_active']);
            $table->index('last_notified_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacancy_subscriptions');
    }
};
