<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Authentication\AuthenticatedRequest;
use App\Http\Requests\Authentication\CreateUserRequest;
use App\Http\Requests\Authentication\UpdateUserRequest;
use App\Http\Requests\Authentication\DestroyUserRequest;
use App\Http\Requests\Authentication\IndexRequest;
use App\Http\Resources\AllUsersResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Notifications\UserRegistered;
use Exception;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['showUser', 'signOut', 'index']);
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

        Auth::login($user);
        $request->session()->regenerate();

        $user->notify(new UserRegistered());

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
     * Signs out of the app.
     */
    public function signOut(Request $request)
    {
        Auth::guard('web')->logout();
        // $request->user()->currentAccessToken()->delete();


        return response()->noContent();
    }

    /**
     * Shows all app users.
     */
    public function index(IndexRequest $request)
    {
        $allUsers = User::all();

        $operation = function (User $u) {
            return $u->admin;
        };

        return new AllUsersResource([
            'admins' => UserResource::collection($allUsers->filter($operation)),
            'nonAdmins' => UserResource::collection($allUsers->reject($operation))
        ]);
    }
}
