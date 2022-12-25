<?php

namespace App\Console\Commands;

use App\Models\Machine;
use Illuminate\Console\Command;

class DeactivateMachines extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'machines:deactivate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deactivates all machines';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $machineCollection = Machine::where('active', true)->get();
        $machineCollection->each->deactivate();

        return Command::SUCCESS;
    }
}
