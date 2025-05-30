---
title: Terrarium
slug: terrarium
description: >-
  An augmented reality simulation to educate gardening techniques.
tags:
  - work
  - unity
  - csharp
added: "May 28 2025"
---

Terrarium is an e-learning tool leveraging Augmented Reality technology.
It uses concepts of game-based learning along with the novelty of AR-based interactions to educate players about various plant species, their preferred habitats, and how to build a terrarium.

# Features

This is a technical write-up, so I'm going to delve into some of the details that I found really interesting or novel.

- The AR Portal
- Plant Placement in AR
- Server and Peristence

## The AR Portal

This is possibly the fanciest eye-grabbing feature of this AR experience.
Once the player scopes out a suitable area, they are prompted to tap on the ground to open a portal into their greenhouse.
While they are outside, the player only sees the doorway and whatever is visible through it.
However, once they enter, they can see everything inside the alternate space, including anything that's behind the doorway itself.
We ended up not drawing anything behind the doorway, and stuck to just a room.

![](https://tgq565ix1n.ufs.sh/f/ck6yA5hy4GoxauosELkYM3ihGvD1WTbA0f8y6Pa74mSsVwpg)

One cool thing I experimented with was using transparent walls and ceiling for the room, and the main motivation was to reduce the amount of interior design needed.
It ended up working great, really selling this idea of a greenhouse, since you were able to see the rest of your environment through the walls while inside your greenhouse.
If you're interested in learning more about how to do this, check out this tutorial that I based my portal behaviour off of.

## Plant Placement in AR

Like math? I love math. Here's a fun math problem to solve.
Given a vector and a plane, generate a new vector that is normal to the plane, drawn from the incident point of the vector on the plane.
When given problems like these, the question often arises: "when would this ever help me in my life?".
These questions open up far more nuanced discussions about formal education curricula and other things, and I'll save my thoughts on that for another day.
However, game development heavily involves concepts of physics and geometry, and problems like these are a treat to solve.

You have a vector and a plane, so you need to calculate the point where the vector coincides with the plane.
Once you get this point, you now end up with a point on a plane, and you can calculate the direction perpendicular to the plane starting at that point.
You can even skip the second step if you know all of your surfaces are upright, and simply assume that the direction of the vector is up.
There are helpful methods offered by most game engines to solve these problems, but it's important to know and to be able to implement it, for those times when an in-built solution fails at an edge case.
Here's what that looks like.

![Demo of aligning coordinates on a plane](https://tgq565ix1n.ufs.sh/f/ck6yA5hy4GoxZeEL5NVPX416GnIb0omchus2x5lSNrvOW7gL)

## Server and Persistence

At the time, I felt most comfortable with relational database design, so I opted to use PostgreSQL.
I had just learnt how to write my own backend servers using Java and Spring Boot from my internship at the time, so naturally, that was my choice for developing the server.

# Technology

The product consists of two parts: the frontend AR application and the backend server.
I used the Unity Game Engine powered by the Unity AR Foundation framework to build an AR application that would deploy across platforms.
I have quite a bit of experience with Unity, so this felt like an obvious choice to me, given the timeline and the amount of work to be done.
For the backend server, I've opted to use Java with the Spring Boot framework.
At the time of the project's conception, I was new to server development, so I just used the tech stack that I learnt from my (then) internship.
The service was originally written in Java 8 using Spring Boot 2, connected to a PostgreSQL database for persistence.

![An attempt at an ER diagram](https://tgq565ix1n.ufs.sh/f/ck6yA5hy4GoxQ3mP0ox4IorqjDp5XUAfRWds4Hym8Kzn0tYi)

Unfortunately, because Heroku decided to [terminate their Free plan](https://www.heroku.com/blog/next-chapter), and because my current server implementation is incompatible with Terrarium's codebase (and would take too long to migrate), the server is no longer functional.

# Development

Before we decided on Terrarium, we experimented with a few other ways to incorporate game-based learning with Augmented Reality, over the months of January and Feruary 2021.
These experiments are elaborated on [Swathi's write-up](https://swathibalaji.com/terrarium).

![Various AR prototypes](https://tgq565ix1n.ufs.sh/f/ck6yA5hy4GoxnbWgjgNGk0vhIULfMSglJzOb4cEaFZHeNo39)

After we decided to pursue this idea, we started on the 4th week of February 2021, and wrapped it up in the second week of March 2021, which sums up to 3 weeks of development.
