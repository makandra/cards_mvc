module EmbedHelper

  # Embed a file as ng-template.
  def embed_template(path, options = {})
    name = options.fetch(:as, path).to_s
    name.gsub!('/templates', '')
    content_tag(:script, type: 'text/x-template', id: name) do
      render template: "#{path}"
    end
  end

  # Embed all HTML files from app/views/templates/<path>.
  def embed_templates(*paths)
    html = ''.html_safe
    root = Rails.root.join('app', 'views')

    Dir[root.join(*paths, '**', '*.html*')].map do |template_path|
      path_name = Pathname.new(template_path)
      next if path_name.basename.to_s =~ /^_/ # partial
      html << embed_template(path_name.relative_path_from(root).sub(/.html.*$/, ''))
      html << "\n"
    end

    html
  end

end
