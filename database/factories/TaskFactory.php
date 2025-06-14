<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::first();
        $project = Project::first();
        return [
            'title' => fake()->text(50),
            'description' => fake()->text(255),
            'is_completed' => fake()->boolean(),
            'deadline' => fake()->date(),
            'user_id' => $user->id,
            'project_id' => $project->id,
        ];
    }
}
