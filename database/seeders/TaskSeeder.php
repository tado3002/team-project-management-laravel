<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $projects = Project::all(['id']);
        foreach ($users as $user) {
            Task::factory(5)->create([
                'title' => fake()->text(10),
                'description' => fake()->text(30),
                'is_completed' => fake()->boolean(),
                'user_id' => $user->id,
                'project_id' => fake()->randomElement($projects),
            ]);
        }
    }
}
