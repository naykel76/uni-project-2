to dos
-----------------------------------------------------------
- fix game over to restart game

bugs
-----------------------------------------------------------
- when changing power with slider than using the key up or key down the value
  is reset to the initial power setting, not the pwr variable
- get projectile to shoot from the front of the cannon not the base



version notes
-----------------------------------------------------------
V006
- fixed scoring system

V005
- done a truck load of stuff, that game has a lot of functionality but needs
  to be tweaked for improved performance and functionality.
- constrained the gun angle
- added images to targets
- added annimated flame
- added collision detection for fire

V004
- added power slider
- added canV variables for slider positioning
- added key events for power slider
- tidied up power slider and text

V003
- added particle system for exploding targets (needs tweaking)
- added scoring system
- enabled remove target when hit
- projectile angle is based on gun angle
- removed particle system (need to review)
- moved main arrays into function to clear up draw a little

V002
- added collision detection and the ability to shoot with the mouse (all settings are manually set).
- can delete from target array when collision detected

V001
- Created multiple target objects and single destroyer (projectile) object with basic variables (no vectors or update function)
- Set up collision detection between targets and single destroyer object and the ability to splice (delete) objects from the targets array.
- Set up helper functions