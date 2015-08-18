require 'execjs'

module Sprockets

  class RiotTemplate < Tilt::Template

    self.default_mime_type = 'application/javascript'

    RUNTIME = ::ExecJS::ExternalRuntime.new(
      name: 'Node.js (V8)',
      command: ['nodejs', 'node'],
      encoding: 'UTF-8',
      runner_path: File.expand_path('../execjs_node_runner.js', __FILE__)
    )

    def prepare
      ENV['NODE_PATH'] = ::Rails.root.join('node_modules').to_s
      @compiler = RUNTIME.compile("require('riot')")
    end

    def evaluate(scope, locals, &block)
      @compiler.call('riot.compile', data)
    end

  end

end
