<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserTypeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$userTypes): Response
    {
        /**
         * this checks if it's an authenticated user
         * if it's not a user you get redirected to the log in page
         */
        if (!$request->user()) {
            return redirect()->route('login');
        }

        /**
         * this gets the user's user_type (column from the database)
         */
        $userType = $request->user()->user_type;

        /**
         *  this checks if the usertype is in the allowed usertype passed by the route
         */
        if (!in_array($userType, $userTypes)) {
            return $this->redirectToCorrectDashboard($userType);
        }

        return $next($request);
    }

    /**
     * @param string $userType
     * @return \Illuminate\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|object
     * this function redirects back to your dashboard in accordance to your user type
     * flags an error if you visit an area that's not authorized to you
     */

    public function redirectToCorrectDashboard(string $userType) {
        switch ($userType) {
            case 'landlord':
                return redirect('landlord/dashboard')->with('error', 'Access denied. You are not authorized to access this area.');
            case 'tenant':
                return redirect('tenant/dashboard')->with('error', 'Access denied. You are not authorized to access this area.');
            case 'prospective_tenant':
                return redirect('/user')->with('error', 'Access denied. You are not authorized to access this area.');
            default:
                return redirect('/')->with('error', 'Access denied. Invalid user type.');
        }
    }
}
