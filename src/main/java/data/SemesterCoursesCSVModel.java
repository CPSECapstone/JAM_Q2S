package data;

import com.opencsv.bean.CsvBindByName;

public class SemesterCoursesCSVModel {
        @CsvBindByName(column = "Course Code")
        private String courseCode;

        @CsvBindByName(column = "Course Name")
        private String courseName;

        @CsvBindByName(column = "Cross-listed As")
        private String crossListed;

        @CsvBindByName(column = "Units")
        private String units;

        @CsvBindByName(column = "Description")
        private String description;

        @CsvBindByName(column = "Term Typically Offered")
        private String typicallyOffered;

        @CsvBindByName(column = "Unformatted Pre-Requisite/Co-Requisite List")
        private String unformattedPrereqs;

        public SemesterCoursesCSVModel(String datum, String datum1, String datum2, String datum3, String datum4, String datum5, String datum6) {
                setCourseCode(datum);
                setCourseName(datum1);
                setCrossListed(datum2);
                setUnits(datum3);
                setDescription(datum4);
                setTypicallyOffered(datum5);
                setUnformattedPrereqs(datum6);
        }

        public String getCourseCode() {
                return courseCode;
        }

        public String getCourseName() {
                return courseName;
        }

        public String getCrossListed() {
                return crossListed;
        }

        public String getDescription() {
                return description;
        }

        public String getTypicallyOffered() {
                return typicallyOffered;
        }

        public String getUnformattedPrereqs() {
                return unformattedPrereqs;
        }

        public String getUnits() {
                return units;
        }

        public void setCourseCode(String courseCode) {
                this.courseCode = courseCode;
        }

        public void setCourseName(String courseName) {
                this.courseName = courseName;
        }

        public void setCrossListed(String crossListed) {
                this.crossListed = crossListed;
        }

        public void setDescription(String description) {
                this.description = description;
        }

        public void setTypicallyOffered(String typicallyOffered) {
                this.typicallyOffered = typicallyOffered;
        }

        public void setUnformattedPrereqs(String unformattedPrereqs) {
                this.unformattedPrereqs = unformattedPrereqs;
        }

        public void setUnits(String units) {
                this.units = units;
        }

        @Override
        public String toString() {
                return "SemesterCoursesCSVModel{" +
                        "courseCode='" + courseCode + '\'' +
                        ", courseName='" + courseName + '\'' +
                        ", crossListed='" + crossListed + '\'' +
                        ", units='" + units + '\'' +
                        ", description='" + description + '\'' +
                        ", typicallyOffered='" + typicallyOffered + '\'' +
                        ", unformattedPrereqs='" + unformattedPrereqs + '\'' +
                        '}';
        }
}

