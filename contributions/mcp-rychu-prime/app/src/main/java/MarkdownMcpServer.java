import io.modelcontextprotocol.server.McpServer;
import io.modelcontextprotocol.server.McpServerFeatures;
import io.modelcontextprotocol.server.McpSyncServer;
import io.modelcontextprotocol.server.transport.StdioServerTransportProvider;
import io.modelcontextprotocol.spec.McpSchema;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public class MarkdownMcpServer {
    public static final String DEFAULT_FOLDER = "/Users/rychu/Baza_Wiedzy";
    public static final String MCP_ARGUMENT = "directory";
    public static final String SCHEMA = """
            {
                "type": "object",
                "properties": {
                    "directory": {
                        "type": "string",
                        "description": "Path to directory to scan for markdown files"
                    }
                }
            }
            """;

    public static void main(String[] args) {
        StdioServerTransportProvider transportProvider = new StdioServerTransportProvider();

        McpSyncServer server = McpServer.sync(transportProvider)
                .serverInfo("markdown-reader", "1.0.0")
                .capabilities(McpSchema.ServerCapabilities.builder()
                        .tools(true)
                        .resources(false, true)
                        .prompts(true)
                        .logging()
                        .completions()
                        .build())
                .build();

        McpServerFeatures.SyncToolSpecification readGivenFolderTool = new McpServerFeatures
                .SyncToolSpecification(new McpSchema.Tool("read-markdown-files",
                "Reads all markdown files from a directory and returns joined text", SCHEMA), (exchange, arguments) -> {
            try {
                String directory;
                if (arguments.get(MCP_ARGUMENT) != null) {
                    directory = (String) arguments.get(MCP_ARGUMENT);
                } else {
                    directory = DEFAULT_FOLDER;
                }
                final String joinedText = readMarkdownFiles(directory);

                return new McpSchema.CallToolResult(List.of(new McpSchema.TextContent(joinedText)), false);
            } catch (Exception e) {
                return new McpSchema
                        .CallToolResult(List.of(new McpSchema.TextContent("Error: " + e.getMessage())), true);
            }
        });

        McpServerFeatures.SyncPromptSpecification readMarkdownPrompt = new McpServerFeatures.SyncPromptSpecification(
                new McpSchema.Prompt(
                        "read-markdown-prompt",
                        "Prompt enhancing reading markdown files",
                        List.of(
                                new McpSchema.PromptArgument(MCP_ARGUMENT, "read all subfolders", true)
                        )
                ),
                (exchange, request) -> {
                    try {
                        var arguments = Optional.ofNullable(request.arguments()).orElse(Map.of());
                        var directory = (String) arguments.getOrDefault(MCP_ARGUMENT, DEFAULT_FOLDER);
                        var messages = List.of(
                                new McpSchema.PromptMessage(
                                        McpSchema.Role.USER,
                                        new McpSchema.TextContent("Whenever you search " + directory + " directory check also recursively all its subfolders")
                                ),
                                new McpSchema.PromptMessage(
                                        McpSchema.Role.USER,
                                        new McpSchema.TextContent("Topic you are looking for should be checked in both filenames and their contents")
                                ),
                                new McpSchema.PromptMessage(
                                        McpSchema.Role.USER,
                                        new McpSchema.TextContent("Always search markdown files with a large context window")
                                )
                        );
                        return new McpSchema.GetPromptResult(
                                "Prompts for searching markdown files",
                                messages
                        );
                    } catch (Exception e) {
                        return new McpSchema.GetPromptResult(
                                "Prompts for searching markdown files",
                                null
                        );
                    }
                }
        );

        server.addTool(readGivenFolderTool);
        server.addPrompt(readMarkdownPrompt);
    }

    private static String readMarkdownFiles(String directoryPath) throws IOException {
        Path startPath = Paths.get(directoryPath);

        if (!Files.exists(startPath) || !Files.isDirectory(startPath)) {
            throw new IOException("Directory does not exist: " + directoryPath);
        }

        try (var stream = Files.walk(startPath)) {
            return stream.filter(Files::isRegularFile).filter(path -> path.toString().toLowerCase().endsWith(".md")).map(MarkdownMcpServer::readFileContent).filter(content -> !content.isEmpty()).collect(Collectors.joining("\n\n--- FILE SEPARATOR ---\n\n"));
        }
    }

    private static String readFileContent(Path filePath) {
        try {
            return Files.readString(filePath);
        } catch (IOException e) {
            return "Error reading file " + filePath + ": " + e.getMessage();
        }
    }
}
