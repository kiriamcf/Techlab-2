<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Authentication\AuthenticatedRequest;
use App\Http\Requests\Authentication\CreateUserRequest;
use App\Http\Requests\Authentication\UpdateUserRequest;
use App\Http\Requests\Authentication\DestroyUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['showUser', 'signOut']);
        $this->middleware('guest:sanctum')->only(['login', 'register']);
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
     * updates user information.
     */
    public function updateUser(UpdateUserRequest $request, User $user)
    {
        return new UserResource(
            tap($user)->update($request->validated())
        );
    }

    /**
     * Shows the current user logged in.
     */
    public function signOut(Request $request)
    {
        Auth::guard('web')->logout();
        // $request->user()->currentAccessToken()->delete();


        return response()->noContent();
    }
}
