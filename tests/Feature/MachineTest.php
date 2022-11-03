<?php

namespace Tests\Feature;

use App\Models\Laboratory;
use App\Models\Machine;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MachineTest extends TestCase
{
    use RefreshDatabase;

    public function testItCanListMachines()
    {
        $laboratory = Laboratory::factory()->create();
        Machine::factory()
            ->for($laboratory)
            ->count(5)
            ->create();

        $this
            ->getJson(route('api.laboratory.machine.index', $laboratory))
            ->assertOk()
            ->assertJsonCount(5, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'description',
                        'laboratory_id',
                        'created_at',
                        'updated_at',
                    ]
                ]
            ]);
    }

    public function testItCanListMachinesWhenAuthenticated()
    {
        $laboratory = Laboratory::factory()->create();
        Machine::factory()
            ->for($laboratory)
            ->count(5)
            ->create();

        Sanctum::actingAs(User::factory()->create());

        $this
            ->getJson(route('api.laboratory.machine.index', $laboratory))
            ->assertOk()
            ->assertJsonCount(5, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'description',
                        'laboratory_id',
                        'created_at',
                        'updated_at',
                    ]
                ]
            ]);
    }

    public function testItCanShowAMachine()
    {
        $machine = Machine::factory()->create();

        $this
            ->getJson(route('api.machine.show', $machine))
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'description',
                    'laboratory_id',
                    'created_at',
                    'updated_at',
                ],
            ])
            ->assertJsonPath('data.id', $machine->id)
            ->assertJsonPath('data.name', $machine->name)
            ->assertJsonPath('data.description', $machine->description)
            ->assertJsonPath('data.laboratory_id', $machine->laboratory_id)
            ->assertJsonPath('data.created_at', $machine->created_at->toJson())
            ->assertJsonPath('data.updated_at', $machine->updated_at->toJson());
    }

    public function testItCanShowAMachineWhenAuthenticated()
    {
        $machine = Machine::factory()->create();

        Sanctum::actingAs(User::factory()->create());

        $this
            ->getJson(route('api.machine.show', $machine))
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'description',
                    'laboratory_id',
                    'created_at',
                    'updated_at',
                ],
            ])
            ->assertJsonPath('data.id', $machine->id)
            ->assertJsonPath('data.name', $machine->name)
            ->assertJsonPath('data.description', $machine->description)
            ->assertJsonPath('data.laboratory_id', $machine->laboratory_id)
            ->assertJsonPath('data.created_at', $machine->created_at->toJson())
            ->assertJsonPath('data.updated_at', $machine->updated_at->toJson());
    }

    public function testItFailsToCreateMachinesWhenUnuthenticated()
    {
        $laboratory = Laboratory::factory()->create();

        $this
            ->postJson(route('api.laboratory.machine.store', $laboratory))
            ->assertUnauthorized();

        $this->assertDatabaseCount(Machine::class, 0);
    }

    public function testItFailsToCreateMachinesWhenUserNotAdmin()
    {
        $laboratory = Laboratory::factory()->create();

        Sanctum::actingAs(User::factory()->create());

        $this
            ->postJson(route('api.laboratory.machine.store', $laboratory))
            ->assertForbidden();

        $this->assertDatabaseCount(Machine::class, 0);
    }

    public function testItFailsToCreateMachinesWhenInvalidData()
    {
        $user = Sanctum::actingAs(User::factory()->create());
        $user->admin = true;

        $laboratory = Laboratory::factory()->create();

        $this
            ->postJson(route('api.laboratory.machine.store', $laboratory), [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'description']);

        $this->assertDatabaseCount(Machine::class, 0);
    }

    public function testItCanCreateMachines()
    {
        $user = Sanctum::actingAs(User::factory()->create());
        $user->admin = true;

        $laboratory = Laboratory::factory()->create();
        
        $this
            ->postJson(route('api.laboratory.machine.store', $laboratory), [
                'name' => $name = fake()->text(25),
                'description' => $description = fake()->text(50),
            ])
            ->assertCreated()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'description',
                    'laboratory_id',
                    'created_at',
                    'updated_at',
                ],
            ])
            ->assertJsonPath('data.name', $name)
            ->assertJsonPath('data.description', $description);

        $this
            ->assertDatabaseCount(Machine::class, 1)
            ->assertDatabaseHas(Machine::class, [
                'name' => $name,
                'description' => $description,
            ]);
    }

    public function testItFailsToUpdateMachinesWhenUnauthenticated()
    {
        $machine = Machine::factory()->create();

        $this
            ->putJson(route('api.machine.update', $machine), [
                'name' => fake()->text(25),
            ])
            ->assertUnauthorized();

        $this
            ->assertDatabaseCount(Machine::class, 1)
            ->assertDatabaseHas(Machine::class, [
                'name' => $machine->name,
            ]);
    }

    public function testItFailsToUpdateMachinesWhenUserNotAdmin()
    {
        $machine = Machine::factory()->create(); 

        Sanctum::actingAs(User::factory()->create());

        $this
            ->putJson(route('api.machine.update', $machine), [
                'name' => fake()->text(25),
            ])
            ->assertForbidden();

        $this
            ->assertDatabaseCount(Machine::class, 1)
            ->assertDatabaseHas(Machine::class, [
                'name' => $machine->name,
            ]);
    }

    public function testItCanUpdateMachines()
    {
        $machine = Machine::factory()->create();

        $user = Sanctum::actingAs(User::factory()->create());
        $user->admin = true;

        $this
            ->putJson(route('api.machine.update', $machine), [
                'name' => $name = fake()->text(25),
            ])
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'description',
                    'laboratory_id',
                    'created_at',
                    'updated_at',
                ],
            ])
            ->assertJsonPath('data.name', $name)
            ->assertJsonPath('data.description', $machine->description);

        $this
            ->assertDatabaseCount(Machine::class, 1)
            ->assertDatabaseHas(Machine::class, [
                'name' => $name,
                'description' => $machine->description,
            ]);
    }

    public function testItCanDeleteMachines()
    {
        $machine = Machine::factory()->create();

        $user = Sanctum::actingAs(User::factory()->create());
        $user->admin = true;

        $this
            ->deleteJson(route('api.machine.destroy', $machine))
            ->assertNoContent();

        $this->assertDatabaseCount(Machine::class, 0);
    }

    public function testItFailsToDeleteMachinesWhenUnauthenticated()
    {
        $machine = Machine::factory()->create();

        $this
            ->deleteJson(route('api.machine.destroy', $machine))
            ->assertUnauthorized();

        $this->assertDatabaseCount(Machine::class, 1);
    }

    public function testItFailsToDeleteMachinesWhenUserNotAdmin()
    {
        $machine = Machine::factory()->create();

        Sanctum::actingAs(User::factory()->create());

        $this
            ->deleteJson(route('api.machine.destroy', $machine))
            ->assertForbidden();

        $this->assertDatabaseCount(Machine::class, 1);
    }
}
