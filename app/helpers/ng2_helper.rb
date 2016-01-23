module Ng2Helper

  def show_last_error
    error_file = Rails.root.join('public', 'ng2', 'last_error.txt')
    if error_file.exist?
      ansi = error_file.read
      if ansi.present?
        html = Ansi::To::Html.new(h(ansi)).to_html.html_safe
        content_tag(:pre, html)
      end
    end
  end

  def javascript_rev_for(path, name)
    full_path = Rails.root.join('public').join(path)
    manifest = JSON.parse(full_path.join('rev-manifest.json').read)
    Pathname.new("/#{path}").join(manifest.fetch(name))
  end

end
