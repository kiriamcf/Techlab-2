<?php

namespace App\Policies;

use App\Models\Laboratory;
use App\Models\Machine;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MachinePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user, Laboratory $laboratory)
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Machine  $machine
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Machine $machine)
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user, Laboratory $laboratory)
    {
        return $user->admin;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Machine  $machine
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Machine $machine)
    {
        return $user->admin;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Machine  $machine
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Machine $machine)
    {
        return $user->admin;
    }
}
