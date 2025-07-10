<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Schedule::command('bills:generate')->monthlyOn(1, '09:00');

Schedule::command('bills:mark-overdue')->daily();
