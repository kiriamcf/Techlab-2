<?php

namespace Tests\Feature;

use App\Models\Machine;
use App\Models\Reservation;
use App\Models\User;
use Carbon\Carbon;
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
            ->assertJsonPath('data.day', Carbon::parse($day)->toJSON());

        $this
            ->assertDatabaseCount(Reservation::class, 1)
            ->assertDatabaseHas(Reservation::class, [
                'hour' => $hour,
                'day' => $day,
            ]);
    }

    public function testItFailsToCreateReservationsWhenInvalidData()
    {
        Sanctum::actingAs(User::factory()->create());

        $machine = Machine::factory()->create();

        $this
            ->postJson(route('api.machine.reservation.store', $machine), [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['hour', 'day']);

        $this->assertDatabaseCount(Reservation::class, 0);
    }

    public function testItFailsToCreateReservationsWhenUnauthenticated()
    {
        $machine = Machine::factory()->create();

        $this
            ->postJson(route('api.machine.reservation.store', $machine))
            ->assertUnauthorized();

        $this->assertDatabaseCount(Reservation::class, 0);
    }

    public function testItCanUpdateReservations()
    {
        $user = Sanctum::actingAs(User::factory()->create());

        $reservation = Reservation::factory()->for($user)->create();

        $this
            ->putJson(route('api.reservation.update', $reservation), [
                'hour' => $hour = fake()->numberBetween(9, 21),
            ])
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
            ->assertJsonPath('data.hour', $hour)
            ->assertJsonPath('data.day', Carbon::parse($reservation->day)->toJSON());

        $this
            ->assertDatabaseCount(Reservation::class, 1)
            ->assertDatabaseHas(Reservation::class, [
                'hour' => $hour,
                'day' => Carbon::parse($reservation->day)->toDateString(),
            ]);
    }

    public function testItFailsToUpdateReservationsWhenUnauthenticated()
    {
        $reservation = Reservation::factory()->create();

        $this
            ->putJson(route('api.reservation.update', $reservation), [
                'hour' => $hour = fake()->numberBetween(9, 21),
            ])
            ->assertUnauthorized();

        $this
            ->assertDatabaseCount(Reservation::class, 1)
            ->assertDatabaseHas(Reservation::class, [
                'hour' => $reservation->hour,
            ]);
    }

    public function testItFailsToUpdateReservationsWhenUserNotOwnerOfReservation()
    {
        Sanctum::actingAs(User::factory()->create());

        $reservation = Reservation::factory()->create();

        $this
            ->putJson(route('api.reservation.update', $reservation), [
                'hour' => $hour = fake()->numberBetween(9, 21),
            ])
            ->assertForbidden();

        $this
            ->assertDatabaseCount(Reservation::class, 1)
            ->assertDatabaseHas(Reservation::class, [
                'hour' => $reservation->hour,
            ]);
    }

    public function testItCanDeleteReservations()
    {
        $user = Sanctum::actingAs(User::factory()->create());

        $reservation = Reservation::factory()->for($user)->create();

        $this
            ->deleteJson(route('api.reservation.destroy', $reservation))
            ->assertNoContent();

        $this->assertDatabaseCount(Reservation::class, 0);
    }

    public function testItFailsToDeleteReservationsWhenUnauthenticated()
    {
        $reservation = Reservation::factory()->create();

        $this
            ->deleteJson(route('api.reservation.destroy', $reservation))
            ->assertUnauthorized();

        $this->assertDatabaseCount(Reservation::class, 1);
    }
}
