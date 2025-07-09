<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Tenant;
use App\Models\ProspectiveTenant;

class TestSTI extends Command
{
    protected $signature = 'test:sti {userId}';
    protected $description = 'Test STI functionality for a converted user';

    public function handle()
    {
        $userId = $this->argument('userId');

        $this->info("Testing STI for user ID: {$userId}");
        $this->line('');

        // Test 1: Base User
        $baseUser = User::withoutGlobalScopes()->find($userId);
        $this->info("✓ Base User Type: " . ($baseUser->user_type ?? 'not found'));

        // Test 2: Tenant Model
        $tenant = Tenant::find($userId);
        if ($tenant) {
            $this->info("✓ Found as Tenant: YES");
            $this->info("✓ Class: " . get_class($tenant));
            $this->info("✓ user_type field: " . $tenant->user_type);
            $this->info("✓ Instance check: " . ($tenant instanceof Tenant ? 'PASS' : 'FAIL'));

            // Test relationships
            $leasesCount = $tenant->leases()->count();
            $this->info("✓ Leases relationship works: {$leasesCount} leases");
        } else {
            $this->error("✗ NOT found as Tenant");
        }

        // Test 3: ProspectiveTenant Model (should NOT find)
        $prospective = ProspectiveTenant::find($userId);
        if ($prospective) {
            $this->error("✗ Still found as ProspectiveTenant (BAD)");
        } else {
            $this->info("✓ NOT found as ProspectiveTenant (GOOD)");
        }

        // Test 4: Scoped Queries
        $tenantCount = Tenant::where('id', $userId)->count();
        $prospectiveCount = ProspectiveTenant::where('id', $userId)->count();

        $this->info("✓ Tenant scope finds: {$tenantCount} records");
        $this->info("✓ Prospective scope finds: {$prospectiveCount} records");

        if ($tenantCount === 1 && $prospectiveCount === 0) {
            $this->info("\n🎉 STI conversion SUCCESSFUL!");
        } else {
            $this->error("\n❌ STI conversion FAILED!");
        }
    }
}
