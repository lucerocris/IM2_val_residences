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
        Schema::table('leases', function (Blueprint $table) {

            // Landlord Review Status
            $table->enum('landlord_review_status', ['pending', 'approved', 'rejected'])
                ->default('pending')
                ->after('lease_status');

            // Review notes from landlord
            $table->text('landlord_review_notes')->nullable()->after('landlord_review_status');

            // Review timestamps
            $table->timestamp('landlord_reviewed_at')->nullable()->after('landlord_review_notes');
            $table->foreignId('landlord_reviewed_by')->nullable()
                ->after('landlord_reviewed_at')
                ->constrained('users')
                ->onDelete('set null');

            // Track Submission readiness
            $table->boolean('documents_submitted_for_review')->default(false)->after('landlord_reviewed_by');
            $table->timestamp('documents_submitted_at')->nullable()->after('documents_submitted_for_review');

            // Add index for landlord queries
            $table->index(['landlord_review_status', 'documents_submitted_for_review'], 'leases_landlord_review_idx');
        });
    }

    public function down(): void
    {
        Schema::table('leases', function (Blueprint $table) {
            $table->dropIndex('leases_landlord_review_idx');
            $table->dropForeign(['landlord_reviewed_by']);
            $table->dropColumn([
                'landlord_review_status',
                'landlord_review_notes',
                'landlord_reviewed_at',
                'landlord_reviewed_by',
                'documents_submitted_for_review',
                'documents_submitted_at'
            ]);
        });
    }
};
