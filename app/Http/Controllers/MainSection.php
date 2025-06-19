<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MainSection extends Controller
{
    public function home() {
        return Inertia::render('main/landing');
    }

    public function about() {
        return Inertia::render('main/AboutUs');
    }

    public function contact() {
        return Inertia::render('main/ContactUs');
    }
}  
