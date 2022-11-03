<?php

namespace Tests\Feature;

use App\Models\Laboratory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Lang;
use Laravel\Sanctum\Sanctum;
use Spatie\LaravelIgnition\Support\LaravelVersion;
use Tests\TestCase;

class LaboratoryTest extends TestCase
{
    use RefreshDatabase;

    public function testItCanListLaboratories()
    {
        Laboratory::factory()
            ->count(5)
            ->create();

        $this
            ->getJson(route('api.laboratory.index'))
            ->assertOk()
            ->assertJsonCount(5, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'room_number',
                        'created_at',
                        'updated_at',
                    ]
                ]
            ]);
    }

    public function testItCanListLaboratoriesWhenAuthenticated()
    {
        Laboratory::factory()
            ->count(5)
            ->create();

        Sanctum::actingAs(User::factory()->create());

        $this
            ->getJson(route('api.laboratory.index'))
            ->assertOk()
            ->assertJsonCount(5, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'room_number',
                        'created_at',
                        'updated_at',
                    ]
                ]
            ]);
    }

    public function testItCanShowALaboratory()
    {
        $laboratory = Laboratory::factory()->create();

        $this
            ->getJson(route('api.laboratory.show', $laboratory))
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'room_number',
                    'created_at',
                    'updated_at',
                ],
            ])
            ->assertJsonPath('data.id', $laboratory->id)
            ->assertJsonPath('data.name', $laboratory->name)
            ->assertJsonPath('data.room_number', $laboratory->room_number)
            ->assertJsonPath('data.created_at', $laboratory->created_at->toJson())
            ->assertJsonPath('data.updated_at', $laboratory->updated_at->toJson());
    }

    public function testItCanShowALaboratoryWhenAuthenticated()
    {
        $laboratory = Laboratory::factory()->create();

        Sanctum::actingAs(User::factory()->create());

        $this
            ->getJson(route('api.laboratory.show', $laboratory))
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'room_number',
                    'created_at',
                    'updated_at',
                ],
            ])
            ->assertJsonPath('data.id', $laboratory->id)
            ->assertJsonPath('data.name', $laboratory->name)
            ->assertJsonPath('data.room_number', $laboratory->room_number)
            ->assertJsonPath('data.created_at', $laboratory->created_at->toJson())
            ->assertJsonPath('data.updated_at', $laboratory->updated_at->toJson());
    }

    public function testItFailsToCreateLaboratoriesWhenUnuthenticated()
    {
        $laboratory = Laboratory::factory()->make();

        $this
            ->postJson(route('api.laboratory.store', $laboratory))
            ->assertUnauthorized();

        $this->assertDatabaseCount(Laboratory::class, 0);
    }

    public function testItFailsToCreateLaboratoriesWhenUserNotAdmin()
    {
        $laboratory = Laboratory::factory()->make();
        Sanctum::actingAs(User::factory()->create());

        $this
            ->postJson(route('api.laboratory.store', $laboratory))
            ->assertForbidden();

        $this->assertDatabaseCount(Laboratory::class, 0);
    }

    public function testItFailsToCreateLaboratoriesWhenInvalidData()
    {
        $user = Sanctum::actingAs(User::factory()->create());
        $user->admin = true;

        $this
            ->postJson(route('api.laboratory.store'), [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'room_number']);

        $this->assertDatabaseCount(Laboratory::class, 0);
    }

    public function testItCanCreateLaboratories()
    {
        $user = Sanctum::actingAs(User::factory()->create());
        $user->admin = true;
        
        $this
            ->postJson(route('api.laboratory.store'), [
                'name' => $name = fake()->text(25),
                'room_number' => $room = fake()->numerify('####'),
            ])
            ->assertCreated()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'room_number',
                    'created_at',
                    'updated_at',
                ]
            ])
            ->assertJsonPath('data.name', $name)
            ->assertJsonPath('data.room_number', $room);

        $this
            ->assertDatabaseCount(Laboratory::class, 1)
            ->assertDatabaseHas(Laboratory::class, [
                'name' => $name,
                'room_number' => $room,
            ]);
    }

    public function testItFailsToUpdateLaboratoriesWhenUnauthenticated()
    {
        $laboratory = Laboratory::factory()->create();

        $this
            ->putJson(route('api.laboratory.update', $laboratory), [
                'name' => fake()->text(25),
            ])
            ->assertUnauthorized();

        $this
            ->assertDatabaseCount(Laboratory::class, 1)
            ->assertDatabaseHas(Laboratory::class, [
                'name' => $laboratory->name,
            ]);
    }

    public function testItFailsToUpdateLaboratoriesWhenUserNotAdmin()
    {
        $laboratory = Laboratory::factory()->create(); 

        Sanctum::actingAs(User::factory()->create());

        $this
            ->putJson(route('api.laboratory.update', $laboratory), [
                'name' => fake()->text(25),
            ])
            ->assertForbidden();

        $this
            ->assertDatabaseCount(Laboratory::class, 1)
            ->assertDatabaseHas(Laboratory::class, [
                'name' => $laboratory->name,
            ]);
    }

    public function testItCanUpdateLaboratories()
    {
        $laboratory = Laboratory::factory()->create();

        $user = Sanctum::actingAs(User::factory()->create());
        $user->admin = true;

        $this
            ->putJson(route('api.laboratory.update', $laboratory), [
                'name' => $name = fake()->text(25),
            ])
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'room_number',
                    'created_at',
                    'updated_at',
                ],
            ])
            ->assertJsonPath('data.name', $name)
            ->assertJsonPath('data.room_number', $laboratory->room_number);

        $this
            ->assertDatabaseCount(Laboratory::class, 1)
            ->assertDatabaseHas(Laboratory::class, [
                'name' => $name,
                'room_number' => $laboratory->room_number,
            ]);
    }

    public function testItCanDeleteLaboratories()
    {
        $laboratory = Laboratory::factory()->create();

        $user = Sanctum::actingAs(User::factory()->create());
        $user->admin = true;

        $this
            ->deleteJson(route('api.laboratory.destroy', $laboratory))
            ->assertNoContent();

        $this->assertDatabaseCount(Laboratory::class, 0);
    }

    public function testItFailsToDeleteLaboratoriesWhenUnauthenticated()
    {
        $laboratory = Laboratory::factory()->create();

        $this
            ->deleteJson(route('api.laboratory.destroy', $laboratory))
            ->assertUnauthorized();

        $this->assertDatabaseCount(Laboratory::class, 1);
    }

    public function testItFailsToDeleteLaboratoriesWhenUserNotAdmin()
    {
        $laboratory = Laboratory::factory()->create();

        Sanctum::actingAs(User::factory()->create());

        $this
            ->deleteJson(route('api.laboratory.destroy', $laboratory))
            ->assertForbidden();

        $this->assertDatabaseCount(Laboratory::class, 1);
    }
}
