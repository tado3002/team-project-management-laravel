<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['programmer','designer','public relation'];
        foreach ($roles as $role) {
            Role::findOrCreate($role);
        }
    }
}
