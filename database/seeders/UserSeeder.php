<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i=0; $i < 20; $i++) { 
            $role = fake()->randomElement(['programmer','designer','public relation']);
            $user = User::factory()->createOne();
            $user->assignRole($role);
        }
    }
}
