function play(){
    // ctx.clearRect(0,0,game.width, game.height);
    // dibujarFondo();
    btn_play.disabled = true;
    btn_stop.disabled = false;

    puntaje = 0;
    currentX = 0;
    currentY = 0;
    direccionSnake = "r";

    snake_head = new Snake(0, 0, 1);
    currentFood = new Comida();

    animacion = request(bucle);
}
function stop(){
    puntaje = 0;
    currentX = 0;
    currentY = 0;
    btn_play.disabled = false;
    btn_stop.disabled = true;
    count = 0;
    snake_head = null;
    currentFood = null;
    animacion = null;
    ctx.clearRect(0,0,game.width, game.height);
    dibujarFondo();
    cancelAnimationFrame(animacion);
}