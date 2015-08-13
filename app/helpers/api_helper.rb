module ApiHelper

  def meta!(json, paginate: nil)
    json.meta do
      if paginate
        json.pagination do
          json.(paginate, :total_pages, :current_page, :total_entries)
        end
      end
    end
  end

end
