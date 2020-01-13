require 'faker'

class PokemonsController < ApplicationController
  def index
    @pokemons = Pokemon.all
    render :json => @pokemons
  end
  def show
    @pokemon = Pokemon.find(params[:id])
    render :json => @pokemon
  end
  def new
    @pokemon = Pokemon.new
  end
  def create
    @trainer = Trainer.find(params[:trainer_id])
    ##byebug
    if @trainer.pokemons.count >= 6
      #flash[:message] = "you has too many pokemons" 
      NULL #need error handling
    else
      @pokemon = Pokemon.new(pokemon_params)
      @pokemon.nickname = Faker::Name.first_name
      @pokemon.species = Faker::Games::Pokemon.name
      @pokemon.trainer = @trainer 
      @pokemon.save
      render :json => @trainer 
    end
  end
  def destroy
    @pokemon = Pokemon.find(params[:id])
    @trainer = @pokemon.trainer 
    @pokemon.destroy
    render :json => @trainer 
  end
  
  private
  def pokemon_params
    params.require(:pokemon).permit(:nickname, :species, :trainer_id, :pokemon => {})
  end

end

