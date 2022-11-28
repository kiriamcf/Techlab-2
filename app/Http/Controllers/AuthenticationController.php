<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Authentication\AuthenticatedRequest;
use App\Http\Requests\Authentication\CreateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['login', 'register']);
    }
    /**
     * Checks wether the user is authentificated or not.
     */
    public function login(AuthenticatedRequest $request)
    {
        $credentials = $request->validated();

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return new UserResource($request->user());
        }

        abort('Invalid credentials');
    }

    /**
     * Creates the user on the database.
     */
    public function register(CreateUserRequest $request)
    {
        $credentials = $request->validated();

        $user = User::create($credentials);

        return new UserResource($user);
    }

    /**
     * Shows the current user logged in.
     */
    public function showUser(Request $request)
    {
        return new UserResource($request->user());
    }

    /**
     * Shows the current user logged in.
     */
    public function signOut(Request $request)
    {
        Auth::logout();

        return response()->noContent();
    }
}
