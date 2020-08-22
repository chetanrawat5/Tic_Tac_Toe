
var trn=0;    // No. of turns
var ch1,ch2;    // Characters 'x' & 'o'
var g=false;    // Whether the game is being played
var win=0;    // Decides who won
var a=new Array();    // The gameboard
a[0]=new Array();
a[1]=new Array();
a[2]=new Array();

function f(r,c)    // For user's turn
{
    if(g)
        if(a[r][c]==0)
        {
            a[r][c]=1;
            trn++;
            set();
            check();
            if(g)
                autogame();
        }
}

function set()    // Draws the gameboard
{
     for(i=0;i<3;i++)
        for(j=0;j<3;j++)
            if(a[i][j]==1)
                document.getElementById("a"+i+j).innerHTML=ch1;
            else if(a[i][j]==-1)
                document.getElementById("a"+i+j).innerHTML=ch2;
            else
                document.getElementById("a"+i+j).innerHTML=" ";
}

function autogame()    // CPU's turn
{
    var r,c,i,j;
    var x;
    for(i=0;i<3;i++)        // Rows
    {
        x=0;
        for(j=0;j<3;j++)
            x=x+a[i][j];
        if(x==-2)
            for(j=0;j<3;j++)
                if(a[i][j]==0)
                {
                    a[i][j]=-1;
                    trn++;
                    set();
                    check();
                    return;
                }
    }
    for(i=0;i<3;i++)        // Columns
    {
        x=0;
        for(j=0;j<3;j++)
            x=x+a[j][i];
        if(x==-2)
            for(j=0;j<3;j++)
                if(a[j][i]==0)
                {
                    a[j][i]=-1;
                    trn++;
                    set();
                    check();
                    return;
                }
    }
    x=0;
    for(i=0;i<3;i++)        // Diagonal 1
        x=x+a[i][i];
    if(x==-2)
        for(i=0;i<3;i++)
            if(a[i][i]==0)
            {
                a[i][i]=-1;
                trn++;
                set();
                check();
                return;
            }
    x=0;
    for(i=0;i<3;i++)        // Diagonal 2
        x=x+a[i][2-i];
    if(x==-2)
        for(i=0;i<3;i++)
            if(a[i][2-i]==0)
            {
                a[i][2-i]=-1;
                trn++;
                set();
                check();
                return;
            }
    // Check User's
    for(i=0;i<3;i++)        // Rows
    {
        x=0;
        for(j=0;j<3;j++)
            x=x+a[i][j];
        if(x==2)
            for(j=0;j<3;j++)
                if(a[i][j]==0)
                {
                    a[i][j]=-1;
                    trn++;
                    set();
                    check();
                    return;
                }
    }
    for(i=0;i<3;i++)        // Columns
    {
        x=0;
        for(j=0;j<3;j++)
            x=x+a[j][i];
        if(x==2)
            for(j=0;j<3;j++)
                if(a[j][i]==0)
                {
                    a[j][i]=-1;
                    trn++;
                    set();
                    check();
                    return;
                }
    }
    x=0;
    for(i=0;i<3;i++)        // Diagonal 1
        x=x+a[i][i];
    if(x==2)
        for(i=0;i<3;i++)
            if(a[i][i]==0)
            {
                a[i][i]=-1;
                trn++;
                set();
                check();
                return;
            }
    x=0;
    for(i=0;i<3;i++)        // Diagonal
        x=x+a[i][2-i];
    if(x==2)
        for(i=0;i<3;i++)
            if(a[i][2-i]==0)
            {
                a[i][2-i]=-1;
                trn++;
                set();
                check();
                return;
            }
    r=(Math.floor(Math.random()*10))%3;
    c=(Math.floor(Math.random()*10))%3;
    if(a[r][c]==0)
    {
        a[r][c]=-1;
        trn++;
    }
    else
        autogame();
    set();
    check();
}

function check()        // Checks if anybody won
{
    var i,j;
    var x;
    for(i=0;i<3;i++)        // Rows
    {
        x=0;
        for(j=0;j<3;j++)
            x=x+a[i][j];
        if(x==3)
        {
            win=1;
            gcntrl();
        }
        else if(x==-3)
        {
            win=2;
            gcntrl();
        }
    }
    for(i=0;i<3;i++)        // Columns
    {
        x=0;
        for(j=0;j<3;j++)
            x=x+a[j][i];
        if(x==3)
        {
            win=1;
            gcntrl();
        }
        else if(x==-3)
        {
            win=2;
            gcntrl();
        }
    }
    x=a[0][0]+a[1][1]+a[2][2];        // Diagonal 1
    if(x==3)
    {
        win=1;
        gcntrl();
    }
    else if(x==-3)
    {
        win=2;
        gcntrl();
    }
    x=a[0][2]+a[1][1]+a[2][0];        // Diagonal 2
    if(x==3)
    {
        win=1;
        gcntrl();
    }
    else if(x==-3)
    {
        win=2;
        gcntrl();
    }
    if(trn==9)
        gcntrl();
}

function gcntrl()        // Function of the red button, controls the game
{
    if(!g)
    {
    a=[[0,0,0],[0,0,0],[0,0,0]];
    set();
    document.getElementById("status").innerHTML="";
    var x=confirm("Do you want to take the first move?\nIf yes, press \"OK\"\nPress \"Cancel\" to pass the move.");
        var pr;
        if(x)
        {
            ch1="x";
            ch2="o";
            pr="yours";
        }
        else
        {
            ch2="x";
            ch1="o";
            pr="mine";
            autogame();
        }
        alert("First move is "+pr+"\nYour symbol "+ch1+"\nMy symbol "+ch2+"\nPress \"OK\"");
        document.getElementById("gmb").innerHTML="RESET";
        g=true;
    }
    else
    {
        document.getElementById("gmb").innerHTML="START";
        if(win==0)
        {
            if(trn==9)
                document.getElementById("status").innerHTML="Game tied!";
            else
                document.getElementById("status").innerHTML="Game terminated!";
        }
        else if(win==1)
            document.getElementById("status").innerHTML="Congratulations! you won!";
        else
            document.getElementById("status").innerHTML="You lost!";
        win=0;
        g=false;
        trn=0;
    }
}

alert("Press \"OK\", then press the \"START\" (red) button to play...")
