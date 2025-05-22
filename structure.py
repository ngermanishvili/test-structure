import os
import sys

def display_tree(path='.', prefix='', is_last=True, max_depth=None, depth=0, exclude_dirs=None):
    """
    Display directory structure in a tree format.
    
    Args:
        path (str): Path to the directory to display
        prefix (str): Prefix to add before each line
        is_last (bool): Is this the last item in its parent directory
        max_depth (int, optional): Maximum depth to display. None means no limit.
        depth (int): Current depth level
        exclude_dirs (list): List of directory names to exclude
    """
    if exclude_dirs is None:
        exclude_dirs = ['node_modules']
        
    if max_depth is not None and depth > max_depth:
        return
    
    base_name = os.path.basename(os.path.abspath(path))
    
    if depth > 0 and base_name in exclude_dirs:
        connector = '└── ' if is_last else '├── '
        print(prefix + connector + base_name + ' [Skipped]')
        return
    
    if depth == 0:
        print(base_name)
    else:
        connector = '└── ' if is_last else '├── '
        print(prefix + connector + base_name)
    
    # Prepare the prefix for children
    child_prefix = prefix + ('    ' if is_last else '│   ')
    
    try:
        # Check if it's actually a directory before listing
        if not os.path.isdir(path):
            return
            
        entries = os.listdir(path)
        entries.sort()
        
        # Filter out hidden files and directories starting with '.'
        entries = [entry for entry in entries if not entry.startswith('.')]
        
        # Display each entry
        for i, entry in enumerate(entries):
            entry_path = os.path.join(path, entry)
            is_entry_last = (i == len(entries) - 1)
            display_tree(entry_path, child_prefix, is_entry_last, max_depth, depth + 1, exclude_dirs)
    except PermissionError:
        print(child_prefix + "└── [Permission Denied]")
    except FileNotFoundError:
        print(child_prefix + "└── [Broken Link or Not Found]")
    except NotADirectoryError:
        pass  # If it's a file, we've already printed it
    except OSError as e:
        print(child_prefix + f"└── [Error: {e}]")

def main():
    """
    Main function to handle command line arguments and display the tree.
    """
    # Default path is the current directory
    path = '.'
    max_depth = None
    exclude_node_modules = True
    exclude_dirs = ['node_modules']
    
    # Parse command line arguments
    if len(sys.argv) > 1:
        path = sys.argv[1]
    
    if len(sys.argv) > 2:
        try:
            max_depth = int(sys.argv[2])
        except ValueError:
            if sys.argv[2].lower() == "include_node_modules":
                exclude_dirs = []
            else:
                print(f"Error: {sys.argv[2]} is not a valid depth value. Using no depth limit.")
    

    
    # Display the tree
    print(f"Directory tree of {os.path.abspath(path)}:")
    display_tree(path, '', True, max_depth, 0, exclude_dirs)

if __name__ == "__main__":
    main()