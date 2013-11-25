class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :content
      t.datetime :pub_date

      t.timestamps
    end
  end
end
