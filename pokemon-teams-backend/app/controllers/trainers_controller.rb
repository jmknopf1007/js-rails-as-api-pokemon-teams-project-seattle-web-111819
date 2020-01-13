class TrainersController < ApplicationController
    def index 
        @trainers = Trainer.all 
        render :json => @trainers 
    end 
    def show
        @trainer = Trainer.find(params[:id])
        render :json => @trainer 
    end
    def update
        @trainer = Trainer.find(params[:id])
        @trainer.name = params[:trainer][:name]
        @trainer.save 
        render :json => @trainer 
    end 
end


# Old Code

# class TrainersController < ApplicationController

#     def index
#         @trainers = Trainer.all 
#         render :json => @trainers 
#     end

#     def show
#         @trainer = Trainer.find(params[:id])
#         render :json => @trainer 
#     end

#     def update
#         @trainer = Trainer.find(params[:id])
#         @trainer.name = params[:name]
#         @trainer.update 
#         render :json => @trainer 
#     end

# end
