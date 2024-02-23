public class Major {
    private Long id;
    private String name;
    private byte[] rulesBlob; // Blob storing Drools rules for the major
    private List<Course> majorClasses;
    private List<Course> supportClasses;
    private List<Course> concentrationClasses;

    // Getters and setters
}