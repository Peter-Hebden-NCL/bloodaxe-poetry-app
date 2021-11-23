# Bloodaxe Poetry App - Server files



This folder contains the files for the Bloodaxe Poetry app's serverside management system, which includes samples of the json files sent from the SQL database to the app upon launch. 



There are three main kinds of file here:

- App update interface files: These make up the simple online interface created to help Bloodaxe staff quickly add new poets and categories to the app, as well as edit existing ones. These files are:
  - index.html
  - edit-poet.php
  - edit-category.php
  - new-poet.php
  - new-category.php
- Scripts for allowing the Bloodaxe Poetry mobile app access to the data stored on the database. These are:
  - handler.php
  - categories_handler.php
  - put_handler.php
- Samples of the data stored on the database and its formatting, along with samples of the files exported to the mobile app when data is requested from the database. These are:
  - categories_array.json
  - poetsdb_save.sql



The folder also contains the external assets used in the creation of the interface. These are the JQuery code library (jquery-1.12.3.js) and the TinyMCE library for embedding rich text WYSIWYG editors. (Contained within the 'tinymce' folder.)



Comments within each file annotate the functions of the code, and placeholders for information are indicated by CAPITALS. 





---
# SYNTAX GUIDE
---

Heading	
# H1
## H2
### H3

Bold	
**bold text**

Italic	
*italicized text*

Blockquote	
> blockquote

Ordered List	
1. First item
2. Second item
3. Third item

Unordered List	
- First item
- Second item
- Third item

Code	
`code`

Horizontal Rule	
---

Link	
[title](https://www.example.com)

Image	
![alt text](image.jpg)


Table	
| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

Fenced Code Block	
```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

Footnote	
Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

Heading ID	
### My Great Heading {#custom-id}

Definition List	
term
: definition

Strikethrough	
~~The world is flat.~~

Task List	
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media