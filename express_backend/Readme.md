Description for the express-backend for the codex_ cli


--Agent
-Orchestrator
gets the initial user input and produces the best possible combination of tools required for the given command
for e.g.
      user: refine x.y.z function and add z.y.x fuctionality
      (orchestrator ouputs  the required tools and carces a plan for the given task by dividing into subtasks)
      orchestrator:{"tools":["a","b"...],"plan_steps":["step_1","step_2"...]}

-Refiner
gets the required tools and the orcehstrators plan and produced a refined summaryh for the vector database retreival of the past_convos and relevant contextual data,
and adds its own enhancements to the orechestrators ouptut

-Main agent
gets the total refined step by step plan with required tools and the context.
outputs the step by step instructive guide to performing the task and gets feedback on each task completion