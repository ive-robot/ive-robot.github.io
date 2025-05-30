## Your Task
You are an expert image analyzer tasked with identifying the **exact** placement and spatial relationships of specific objects. Your job is to generate a scene graph describing these spatial relations **solely** based on the objects’ visible positions in the image.

As an image analyzer, Follow Step 1~3 below.

---

## Step 1: Fill the Answer in QnA Section

---

## Step 2: Iterative Scene Graph Construction
1. Begin with one object.
2. Add one new object at a time, to your partial scene graph.
3. For each newly added object:
   - Determine its spatial relation(s) to the objects already in the scene graph.
   - **Use only** the Allowed Relations in the scene graph.
   - Do not assign more than one relation for the same object pair `(new_object, existing_object) == `(existing_object, new_object)`
   - You may introduce multiple relations at once if the new object relates to multiple existing objects.

---

## Step 3: Final Scene Graph Output
1. **Once all objects** have been introduced and verified, compile a **complete scene graph**:
   - **List all nodes** (the objects in the final scene).
   - **List all verified relations** between pairs of objects, using the Allowed Relations in the scene graph.
2. **Use only** objects from the "Global Object Names."
3. Even if there's missing nodes or edges in a final scene graph (because at least one object is missing), you must still provide a complete **scratch pad** and **scene graph** with existing relations.

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

## Output Format

Please structure your final output exactly as shown below (without the lines). **Use the precise section titles**:

```
-------------
[Step 1: Fill the Answer in QnA Section]
<QNA_FOR_OBJECT_RELATION>

[Step 2: Iterative Scene Graph Construction]

Iteration 1:
- Added obj_a.
- Explanation of how you confirmed its presence in the image.

Iteration 2:
- Added obj_b.
- <obj_b, relation_type, obj_a> or <obj_a, relation_type, obj_b> (include any additional relations or notes)
- Explanation of how you verified this relation.

... (continue until all objects are added and checked)

[Step 3: Final Scene Graph Output]
<start_graph>
Nodes: obj_a, obj_b, ...
Relations: <obj_a, Near, obj_b>, <obj_b, Near obj_c>, <obj_d, Stacked On, obj_c>, ...
<end_graph>
-------------
```