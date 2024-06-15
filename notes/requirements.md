# System requirements

# Login
Use the ISS JWT login system (see [here](https://weblogin.lancs.ac.uk/jwt/list.php))  
Guest logins for external players  

# Levels of access
Committee members - and their roles within committee  
Members  
Non-members  
  
*Instead could build a system that abstracts roles/permissions related to them, so that at deployment they can be modified*  

# Access control modifiers
**Joining the society** - how? Potential solutions: logging in via WebLogin, request for approval from a committee member // User added and invited by committee member  
**Becoming a committee member** - automatic after a committee vote // outgoing president assigns  
**Handover period** - How long? // What additional permissions are granted?  

# Website core
Markdown-based live page editing system  
Header modification and menus so subpages accessible  
Adding own subdirectories  
Module-based for extra functionality to be added later  
Blog  
Members-only updates  
Voting  
When is good replacement  
Events  
File sharing  

**Importantly,** system should be modular, config to make changes to the page such as colours and more, with option to edit raw assets  

# Pages
Markdown-based with astro - how do we live preview?  
Parameters for page - what categories/tags can things be under, who can see it, comments?  
Comments (future)  
How are subdirectories managed?  

# Blog
Blog page based on astro markdown  
Members-only blog? - access control of individual blog pages  

# Voting
What voting systems need to be added // make modular voting system with user defined-preferences

# When is good replacement
2x2 array that represents times and days
Need system for creating, replying, and seeing results from whenisgood replacement  
Access control? - could make a boilerplate system for access control and bring it here and elsewhere?  

# Events
How similar are these to blog posts?  
Mirror features from fb group events  

# File sharing
Basic system for sharing music/links to music that can be access controlled (in case of non-pd music)  