var minefield = [];
var scale = 40; 
var border_width = 4;
var pole_x = 0,pole_y = 0,mine_sum = 0,mine_check = 0, lic = 0;
	
	function pole(n,m)
	{
		
		var table = document.createElement("table");
		table.setAttribute("id","game");
		table.style.width = ((scale+border_width)*m+border_width)+"px";
		table.style.height = ((scale+border_width)*n+border_width)+"px";
		for(i = 0; i < n; i++)
		{
			var tr = document.createElement("tr");
			for(j = 0; j < m; j++)
			{
				var td = document.createElement("td");
				td.setAttribute("oncontextmenu","flag("+i+","+j+"); return false;");
				td.setAttribute("onclick","try_lose("+i+","+j+"); check_win();");
				td.style.width= scale+"px";
				td.style.height= scale+"px";
				td.style.border = border_width+"px solid cyan";
				td.style.backgroundColor = "red";
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		document.body.appendChild(table);
	}
	
		function check_win()
	{
		mine_check = 0;
		for (i = 0; i < pole_x; i++)
			for (j = 0; j < pole_y; j++)
				if ((game.children[i].children[j].style.backgroundColor == "red")||(game.children[i].children[j].style.backgroundColor == "blue"))
				{
					mine_check++;
				}
			if (mine_sum == mine_check)
			{
				for (i = 0; i < pole_x; i++)
				{
					for (j = 0; j < pole_y; j++)
						{
							if (minefield[i][j] == 1) game.children[i].children[j].style.backgroundColor = "black";
							if ((minefield[i][j] != 1) && (game.children[i].children[j].style.backgroundColor == "blue")) game.children[i].children[j].style.backgroundColor = "green";
							game.children[i].children[j].removeAttribute("onclick");
							game.children[i].children[j].removeAttribute("oncontextmenu");
						}
				}
				setInterval("next();", 7500);
				soundClick_win();

			}
	}
	
	function flag (n,m)
	{
		if (game.children[n].children[m].style.backgroundColor == "blue") 
		{
			game.children[n].children[m].style.backgroundColor = "red";
			game.children[n].children[m].setAttribute("onclick","try_lose("+n+","+m+"); check_win();");
		} else
		{
		game.children[n].children[m].style.backgroundColor = "blue";
		game.children[n].children[m].removeAttribute("onclick");
		}
	}
	
	
	function try_lose(n,m)
	{
			if ((((n) >= 0)&&((m) >= 0))&&(((n) < pole_x)&&((m) < pole_y)))
				if ((game.children[n].children[m].style.backgroundColor != "yellow")&&(game.children[n].children[m].style.backgroundColor != "white")&&(game.children[n].children[m].style.backgroundColor != "blue"))
					if (minefield[n][m] == 1) 
					{
						soundClick_lose();
						next();
					}else
					{
						var sum = 0;
						for (i = -1; i <= 1; i++)
						{
							for (j = -1; j <= 1; j++)
							{	
								if ((((n+i) >= 0)&&((m+j) >= 0))&&(((n+i) < pole_x)&&((m+j) < pole_y))) {sum += minefield[n+i][m+j];}
								if ((i == 0)&&(j == 0)){sum -= minefield[n+i][m+i];}
							}
						}
						if (sum > 0) 
						{
							game.children[n].children[m].style.backgroundColor = "yellow";
							game.children[n].children[m].removeAttribute("onclick");
							game.children[n].children[m].removeAttribute("oncontextmenu");
							game.children[n].children[m].innerHTML = sum;
						} else
						{
							game.children[n].children[m].style.backgroundColor = "white";
							game.children[n].children[m].removeAttribute("onclick");
							game.children[n].children[m].removeAttribute("oncontextmenu");
							lic++;
							try_lose(n-1,m-1);
							try_lose(n-1,m);
							try_lose(n-1,m+1);
							try_lose(n,m-1);
							try_lose(n,m+1);
							try_lose(n+1,m-1);
							try_lose(n+1,m);
							try_lose(n+1,m+1);
							
						}
					}	
				
	}
	
	function generate_minefield(n, m, k)
	{
		for (i = 0; i < n; i++)
		{
			minefield[i] = [];
			for (j = 0; j < m; j++)
			{
				minefield[i][j] = 0;
			}
		}
		for (mine = 0; mine < k ; mine++)
		{
		do
		{
			var trig = false;
			var ri = Math.round(Math.random() * (n) - 0.5);
			var rj = Math.round(Math.random() * (m) - 0.5);
			if (minefield[ri][rj] != 1) 
				{
				minefield[ri][rj] = 1;
				trig = true;
				}
		}
		while (!trig);
		}
	}
	
	
	function playgame()
	{
		pole_x = pole_xe.value;
		pole_y = pole_ye.value;
		mine_sum = mine_sume.value;
		enter.hidden = true;
		lic = 0;
		generate_minefield(pole_x,pole_y,mine_sum);
		pole(pole_x,pole_y);
	}
	
	function exit_game()
	{
		document.body.removeChild(exit_game_scr);
		document.body.removeChild(game);
		enter.hidden = false;
	}
	
	function soundClick_lose() 
	{
	var audio = new Audio();
	audio.src = "wtf_boom.mp3"; 
	audio.play(); 
	}
	
	function soundClick_win() 
	{
	var audio = new Audio();
	audio.src = "new_win.mp3"; 
	audio.play(); 
	}
	
	function next()
	{
	for (i = 0; i < pole_x; i++)
		{
			for (j = 0; j < pole_y; j++)
				{
					if (minefield[i][j] == 1) game.children[i].children[j].style.backgroundColor = "black";
					if ((minefield[i][j] != 1) && (game.children[i].children[j].style.backgroundColor == "blue")) game.children[i].children[j].style.backgroundColor = "green";
					game.children[i].children[j].removeAttribute("onclick");
					game.children[i].children[j].removeAttribute("oncontextmenu");
				}
		}
		var img = document.createElement("img");
		img.style.width= "100%";
		img.style.height= "100%";
		img.style.position= "fixed";
		img.style.top="0px";
		img.style.left="0px";
		img.setAttribute("src","");
		img.setAttribute("id","exit_game_scr");
		img.src= "08e.gif";
		document.body.appendChild(img);
		setInterval("location.reload();", 8000);
	}
	
	function check_polex()
	{
		if ((isNaN(pole_xe.value))||(pole_xe.value < 0)||(pole_xe.value > 100)||((pole_xe.value % 1) != 0)) pole_xe.value = "";
	}
	
	function check_poley()
	{
		if ((isNaN(pole_ye.value))||(pole_ye.value < 0)||(pole_ye.value > 100)||((pole_ye.value % 1) != 0)) pole_ye.value = "";
	}
	
	function check_x_y()
	{
	if ((isNaN(mine_sume.value))||(mine_sume.value < 0)||(Number(mine_sume.value) > Number(pole_xe.value*pole_ye.value))) mine_sume.value = "";
	}