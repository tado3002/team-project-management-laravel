<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\ProjectCreateRequest;
use App\Http\Requests\Project\ProjectUpdateRequest;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('tasks.user')->get();
        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectCreateRequest $request)
    {
        $data = $request->validated();
        $project = Project::create($data);
        return redirect()->route('projects.index')->with('success', 'Success created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectUpdateRequest $request, Project $project)
    {
        $data = $request->validated();
        $project->fill($data);
        $project->save();
        return redirect()->route('projects.index')->with('success', 'Success Updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
