The Novel Game API
========================

This is novel game script engine for JavaScript.

Sample
------
\[JavaScript\]

	var novel_API = new NovelGameAPI("Frame") ; //<div id="Frame"></div>
	novel_API .Ready(function(){
		novel_API
			.size(500 , 300)	//Frame size
			.dlgSize(200)		//dialog box size
			.mes("Someting text...")
			.cls()				//  clear text
			.mes("I'm angry because I'm hungry.")
			.cls()
			.mes("Why don't you go to the park? Oh , No Thank you? Heck!")
			.cls()
			.mes("Diet won't become thin!")
			.Start()			// begin to play game
			
	}) ;

\[HTML\]

		<div id="NobelGameFrame" class="NobelGameFrame">
			<div class="Name"></div>
			<div class="Content" selection="false"></div>
		</div>

API
---

 * `NovelGameAPI` : game main object
 * `Ready([Function]func)` : This is like jQuery $(function(){ ~ function.
 * `[NovelGameAPI] size(width , height)` : setting frame width and height
 * `[NovelGameAPI] dlgSize(height)` : setting dialog-box height
 * `[NovelGameAPI] mes([String]str)` : show message like type-writer.
 * `Start` : begin to play game