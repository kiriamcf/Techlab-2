<?php

namespace Tests\Feature;

use App\Models\Machine;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use LDAP\Result;
use Tests\TestCase;

class ReservationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testItCanListReservations()
    {
        $user = Sanctum::actingAs(User::factory()->create());

        $machine = Machine::factory()->create();
        Reservation::factory()
            ->for($machine)
            ->for($user)
            ->count(5)
            ->create();

        $this
            ->getJson(route('api.machine.reservation.index', $machine))
            ->assertOk()
            ->assertJsonCount(5, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'hour',
                        'day',
                        'machine_id',
                        'user_id',
                        'created_at',
                        'updated_at',
                    ]
                ]
            ]);
    }

    public function testItFailsToListReservationsWhenUnauthenticated()
    {
        $machine = Machine::factory()->create();
        Reservation::factory()
            ->for($machine)
            ->count(5)
            ->create();

        $this
            ->getJson(route('api.machine.reservation.index', $machine))
            ->assertUnauthorized();
    }

    public function testItCanShowAMachine()
    {
        $reservation = Reservation::factory()->create();
        Sanctum::actingAs(User::factory()->create());

        $this
            ->getJson(route('api.reservation.show', $reservation))
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'hour',
                    'day',
                    'machine_id',
                    'user_id',
                    'created_at',
                    'updated_at',
                ]
            ])
            ->assertJsonPath('data.id', $reservation->id)
            ->assertJsonPath('data.hour', $reservation->hour)
            ->assertJsonPath('data.day', $reservation->day->toJson())
            ->assertJsonPath('data.machine_id', $reservation->machine_id)
            ->assertJsonPath('data.user_id', $reservation->user_id)
            ->assertJsonPath('data.created_at', $reservation->created_at->toJson())
            ->assertJsonPath('data.updated_at', $reservation->updated_at->toJson());
    }

    public function testItFailsToShowAReservationWhenUnauthenticated()
    {
        $reservation = Reservation::factory()->create();

        $this
            ->getJson(route('api.reservation.show', $reservation))
            ->assertUnauthorized();
    }

    public function testItCanCreateReservations()
    {
        Sanctum::actingAs(User::factory()->create());

        $machine = Machine::factory()->create();
        
        $this
            ->postJson(route('api.machine.reservation.store', $machine), [
                'hour' => $hour = fake()->numberBetween(9, 21),
                'day' => $day = fake()->date('Y-m-d'),
            ])
            ->assertCreated()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'hour',
                    'day',
                    'machine_id',
                    'user_id',
                    'created_at',
                    'updated_at',
                ]
            ])
            ->assertJsonPath('data.hour', $hour)
            ->assertJsonPath('data.day', $day);

        $this
            ->assertDatabaseCount(Reservation::class, 1)
            ->assertDatabaseHas(Reservation::class, [
                'hour' => $hour,
                'day' => $day,
            ]);
    }
}
