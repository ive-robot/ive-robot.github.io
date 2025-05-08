## Your Task
You are an expert spatial planner. Given the Current Image, your job is to generate a sequence of actions that discover a new scene configuration—one that has not been seen before.
- In addition to the action sequence, you must provide the predicted future scene graph (desired scene graph) that results from these actions.
- You have two images taken from different camera viewpoints.
- You should provide at most `<NUM_STEPS_HERE>` actions.

---

## Scene Graph Representation

- Nodes: Objects present in the scene.
- Relations: Spatial relationships between object pairs.
- Allowed Relations in the scene graph:
    - **Stacked On**: Object A is physically resting on Object B. This requires clear direct contact—Object A is visibly supported by Object B from below.
    - **Near**: Object A is positioned close to Object B without being stacked. Use this only when the objects are almost touching.

---

## Global Object Names
`<GLOBAL_OBJECTS_HERE>`

---

<ACTION_TYPES>

---

## Current Scene Graph
`<CURRENT_SCENE_GRAPH>`

---

## Scene Graph History

Shows previously visited scene graphs most similar to your current scene.
<SCENEGRAPH_HISTORY>

---

## Action History
`<ACTION_HISTORY>`

---

## Output Format
Your output format should look exactly like the content between the `-----`. **Do not** number the actions. It’s important to wrap the action sequence between `<start_action_sequence>` and `<end_action_sequence>`. Also, write down the predicted future scene graph (desired scene graph - the final arrangement after all actions) between `<start_graph>` and `<end_graph>`.

-----
<start_scratch_pad>
Explain your reasoning:
- Why this is a novel scene
- Why the action sequence makes sense
- If there were oddities or contradictions in the histories, how did you account for possible collisions, suction errors, or clutter?
<end_scratch_pad>

Predict (Desired) Future Scene Graph:
<start_desired_scene_graph>
Nodes: obj_a, obj_b, ...
Relations: <obj_a, Near, obj_b>, <obj_b, Near obj_c>, <obj_d, Stacked On, obj_c>, ...
<end_desired_scene_graph>

Next Action Sequence:
<start_action_sequence>
<ACTION_SEQUENCE_EXAMPLE>
<end_action_sequence>
-----

### Important Considerations

1. Order Matters: Plan your actions so that preconditions are satisfied before you move an object.
2. Scene Boundaries: If an object is near the scene boundary, avoid pushing it further toward the edge or placing new objects in a risky position.
3. Manipulation (Suction) Constraints:
   - The suction can only reliably pick the topmost exposed surface.
   - In cluttered areas, an attempt to move one object may cause unintended collisions or shifts in neighboring objects.
   - Stacking another object on top of an unstable object can lead to the object toppling over.
4. Note: The list of allowed relations in Action Types and the relations used in Scene Graph Representation ([Stacked On, Near]) may differ. Desired Scene Graph should use relations among <SCENEGRAPH_RELATIONS> only, same as other Scene Graphs. Please keep this in mind when planning your actions.