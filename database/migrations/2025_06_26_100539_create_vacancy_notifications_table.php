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
        Schema::create('vacancy_notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subscription_id')->constrained('vacancy_subscriptions')->onDelete('cascade');
            $table->foreignId('unit_id')->constrained('rental_units')->onDelete('cascade');
            $table->string('email');
            $table->text('message');
            $table->timestamp('sent_at');
            $table->timestamps();

            //indexes
            $table->index(['email', 'sent_at']);
            $table->index(['unit_id', 'sent_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacancy_notifications');
    }
};
