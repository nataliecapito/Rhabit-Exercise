module Api::V1
  class UsersController < ApplicationController
    def index
      users = []
      users = User.all
      render json: users
    end

    def show
      fail ActionController::ParameterMissing, 'requires id' unless params.key?(:id)

      manager_children = nil
      unless params[:id].nil?
        manager_children = children_of_manager(User.find_by(id: params[:id]))
      end

      render json: manager_children
    end

    def create
      fail ActionController::ParameterMissing, 'requires id' unless params.key?(:user)
      render json: User.create(user_params).save!
    end

    def destroy
      fail ActionController::ParameterMissing, 'requires id' unless params.key?(:id)
      remove_user = User.find(params[:id])

      if remove_user.destroy
        head :no_content, status: :ok
      else
        render json: remove_user.errors, status: :unprocessable_entity
      end

      return_with_notice("#{remove_user.first_name remove_user.last_name} was removed.")
    end

    def update
      fail ActionController::ParameterMissing, 'requires id' unless params.key?(:id)

      updated_user = User.find(params[:id])
      updated_user.update_attributes(user_params)

      render json: updated_user
    end

    private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :title, :manager_id)
    end

    def children_of_manager(manager)
      children = find_child_ids(manager.id)

      children.each { |child_id|
        this_childs_children = find_child_ids(child_id.id)
        children += this_childs_children
      }

      return children
    end

    def find_child_ids(id)
      return User.where(manager_id: id)
    end
  end
end
