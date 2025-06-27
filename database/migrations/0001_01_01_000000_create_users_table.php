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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('user_name');
            $table->string('email')->unique();
            $table->string('user_contact_number');
            $table->enum('user_type', ['landlord', 'tenant', 'prospective_tenant']);


            //para sa tenants
            $table->date('move_in_date')->nullable();
            $table->string('employment_status')->nullable();
            $table->string('emergency_contact')->nullable();
            $table->string('tenant_occupation')->nullable();

            //landlord stuff for transparency
            $table->string('business_license')->nullable();
            $table->text('landlord_bio')->nullable();

            //prospective tenants stuff
            $table->decimal('monthly_income', 10, 2)->nullable();
            $table->string('current_address')->nullable();


            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

//            Indexes
            $table->index('user_type');
            $table->index('email');
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
