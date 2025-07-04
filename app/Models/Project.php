<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'is_completed',
        'deadline',
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    protected function casts()
    {
        return [
            'deadline' => 'datetime'
        ];
    }
}
